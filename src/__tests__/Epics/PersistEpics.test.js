import expect, { createSpy, spyOn, isSpy } from 'expect'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable';
import {PersistAwsConfigEpic, PersistLoadEpic, PersistSaveEpic} from 'Epics/PersistEpics';
import {trySavePersistedData, loadedPersistedData, didSavePersistedData, loadedAwsUserConfig} from 'Actions/ActionIndex';
import Persist from 'SideEffects/Persist';

describe('PersistEpics', () => {

  // Clean up any leftover spies before next test
  // Not sure if this is needed
  afterEach(() => {
    if (typeof spy !== 'undefined') {
      spy.restore();
      spy.reset();
    }
  });

  describe('PersistAwsConfigEpic', () => {

    // triggering action
    const action$ = ActionsObservable.of( { type: 'AWSUSERCONFIG_CHANGING', stateKey: 'someKey', value: 'some value' } );

    it('returns the success action on success', (done) => {

      //on success, we should get the success action from the action creator (persistLoadSuccess)
      const expectedSuccessActions = [trySavePersistedData('someKey', 'some value')];

      PersistAwsConfigEpic(action$)
          .toArray()
          .subscribe(actualOutputActions => {
                expect(actualOutputActions).toEqual(expectedSuccessActions);
                done();
              }
          );
    });

    // No Failure case as it's the epic is just mapping the AWSUSERCONFIG_CHANGING action to a save persisted data action
  });

  describe('PersistLoadEpic', () => {

    it('loads data on initialization', (done) => {

      // mock data
      const someState = {
        hi: "I am (fake) persisted data",
        meToo: "more data"
      };

      const storedState = {someState};

      spyOn(Persist, 'load').andReturn(
          Observable.of(loadedPersistedData(storedState))
              .map((action) => {
                return action.savedState;
              })
      );

      const action$ = ActionsObservable.of( {type: 'APP_INIT', payload: {} } );

      const actionPayload = 'foo';

      //on success, we should get the success action from the action creator (persistLoadSuccess)
      const expectedSuccessActions = [loadedPersistedData({someState}), loadedAwsUserConfig({someState})];

      // {persistLoad} is dependencies.persistLoad,
      // where dependencies is defined in configStore
      PersistLoadEpic(action$, null, {persistLoad: Persist.load})
      // we convert to an array to ensure that we only emitted once
          .toArray()
          .subscribe(injectedDependencyOutput => {
                // persistLoad would have done any side effects here and the output of those
                // side effects would be available through the observable stream (injectedDependencyOutput)
                expect(injectedDependencyOutput).toEqual(expectedSuccessActions);
                done();
              }
          );
    });

    it('loads data after saving', (done) => {

      // mock data
      const someState = {
        hi: "I am (fake) persisted data",
        meToo: "more data"
      };

      const storedState = {someState};

      spyOn(Persist, 'load').andReturn(
          Observable.of(loadedPersistedData(storedState))
              .map((action) => {
                return action.savedState;
              })
      );

      const action$ = ActionsObservable.of( {type: 'PERSIST_SAVE_SUCCESS', payload: {} } );

      const actionPayload = 'foo';

      //on success, we should get the success action from the action creator (persistLoadSuccess)
      const expectedSuccessActions = [loadedPersistedData({someState}), loadedAwsUserConfig({someState})];

      // {persistLoad} is dependencies.persistLoad,
      // where dependencies is defined in configStore
      PersistLoadEpic(action$, null, {persistLoad: Persist.load})
      // we convert to an array to ensure that we only emitted once
          .toArray()
          .subscribe(injectedDependencyOutput => {
                // persistLoad would have done any side effects here and the output of those
                // side effects would be available through the observable stream (injectedDependencyOutput)
                expect(injectedDependencyOutput).toEqual(expectedSuccessActions);
                done();
              }
          );
    });

  it('returns the error action on error', (done) => {

    // Save triggers a load
    const action$ = ActionsObservable.of( {type: 'PERSIST_SAVE_SUCCESS', payload: {} } );

    // epic injected dependency must be observable
    const injectedDependency = () => Observable.throw('threw error');

    const expectedErrorActions = [
      {
        type: 'PERSIST_LOAD_FAIL',
        payload: 'threw error',
        error: true
      }
    ];

    // {persistLoad} is dependencies.persistLoad,
    // where dependencies is defined in configStore
    PersistLoadEpic(action$, null, {persistLoad: injectedDependency})
        // we convert to an array to ensure that we only emitted once
        .toArray()
        .subscribe(actualOutputActions => {
              expect(actualOutputActions).toEqual(expectedErrorActions);
              done();
            }
        );
  });

    describe('PersistSaveEpic', () => {

      it('persists data', (done) => {

        // mock data
        const someState = {
          hi: "I am (fake) persisted data",
          meToo: "more data"
        };

        const storedState = {someState};

        // triggering action
        const action$ = ActionsObservable.of( trySavePersistedData(storedState) );


        // verifies side effect called (Persist.save)
        // Persist.save returns true if the object was stored
        // persistSave (the injected dependency) is mocked
        spyOn(Persist, 'save').andReturn(
            Observable.of(didSavePersistedData(storedState))
                .map((action) => {
                  return true;
                })
        );

        const persistSave = Persist.save;

        //on success, we should get the success action from the action creator (persistSaveSuccess)
        //save returns true if it is successful
        const expectedOutputActionWithSideEffect = didSavePersistedData(true);
        expect(expectedOutputActionWithSideEffect).toBeTruthy(); // sanity check

        PersistSaveEpic(action$, null, {persistSave})
        // we convert to an array to ensure that we only emitted once
            .toArray()
            .subscribe(actualOutputActions => {
                  expect(actualOutputActions).toEqual([expectedOutputActionWithSideEffect]);
                  // verify we are saving the object we expect as the side effect
                  expect(Persist.save).toHaveBeenCalled(didSavePersistedData(true));
                  done();
                }
            );
      });

      it('returns the error action on error', (done) => {

        const action$ = ActionsObservable.of( {type: 'PERSIST_SAVE_REQUEST', stateKey: 'someKey', value: 'some value' } );

        // epic injected dependency must be observable
        const injectedDependency = () => Observable.throw('threw error');

        const expectedErrorActions = [
          {
            type: 'PERSIST_SAVE_FAIL',
            payload: 'threw error',
            error: true
          }
        ];

        // {persistSave} is dependencies.persistSave,
        // where dependencies is defined in configStore
        PersistSaveEpic(action$, null, {persistSave: injectedDependency})
        // we convert to an array to ensure that we only emitted once
            .toArray()
            .subscribe(actualOutputActions => {
                  expect(actualOutputActions).toEqual(expectedErrorActions);
                  done();
                }
            );
      });

      it('skips saving if there is no key', (done) => {

        const action$ = ActionsObservable.of( {type: 'PERSIST_SAVE_REQUEST', value: 'some value' } );

        // epic injected dependency must be observable
        const injectedDependency = () => Observable.throw('threw error');

        // {persistSave} is dependencies.persistSave,
        // where dependencies is defined in configStore
        PersistSaveEpic(action$, null, {persistSave: injectedDependency})
        // we convert to an array to ensure that we only emitted once
            .toArray()
            .subscribe(actualOutputActions => {
                  expect(actualOutputActions[0].type).toEqual('PERSIST_SAVE_SKIPPED');
                  done();
                }
            );
      });

      it('skips saving if there is no value', (done) => {

        const action$ = ActionsObservable.of( {type: 'PERSIST_SAVE_REQUEST', stateKey: 'someKey' } );

        // epic injected dependency must be observable
        const injectedDependency = () => Observable.throw('threw error');

        // {persistSave} is dependencies.persistSave,
        // where dependencies is defined in configStore
        PersistSaveEpic(action$, null, {persistSave: injectedDependency})
        // we convert to an array to ensure that we only emitted once
            .toArray()
            .subscribe(actualOutputActions => {
                  expect(actualOutputActions[0].type).toEqual('PERSIST_SAVE_SKIPPED');
                  done();
                }
            );
      });
    });
  });
});

