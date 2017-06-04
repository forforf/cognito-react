
// Action Naming Convention
// <actionVerb> ex: set, try, loaded, saved, request, failed, skipped, confirm, validate, verify, did, didNot
// <contextThing> ex: AwsConfig, SignIn, Register, User, ...

export {setAwsUserConfig, loadedAwsUserConfig} from 'Actions/AwsUserConfigActions';
export {loadedPersistedData, didSavePersistedData, trySavePersistedData} from 'Actions/PersistActions';
export {tryCognitoSignIn,
        didCognitoSignIn,
        tryCognitoRegister,
        tryConfirmCognitoUser} from 'Actions/AwsCognitoActions';
