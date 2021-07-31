export const error = {
  //General
  SERVER_NOT_AUTHENTICATED:
    "You are not currently logged in. Please refresh the page and sign in to perform this action",
  SERVER_USER_NOT_FOUND: "We're having trouble locating your information right now",
  SERVER_NO_BUCKET_DATA: "We ran into issues while trying to locate your data",

  //Activity and explore
  SERVER_GET_ACTIVITY_NOT_FOUND: "We're having trouble loading activity right now",
  SERVER_GET_EXPLORE_NOT_FOUND: "We're having trouble loading explore right now",

  //Filecoin and archiving
  SERVER_SEND_FILECOIN_ACTION_FAILURE: "We're having trouble sending out Filecoin right now",
  SERVER_ARCHIVE_NO_FILES: "You have no files to archive",
  SERVER_ARCHIVE_BUCKET_TOO_SMALL:
    "Your deal size is too small to archive. Deals should be a minimum of 100MB",
  SERVER_ARCHIVE_BUCKET_COUNT_VERIFICATION_FAILED:
    "We ran into issues while verifying your ability to make storage deals",
  SERVER_ARCHIVE_MAX_NUMBER_BUCKETS:
    "You have reached the maximum number of storage deals for this account",
  SERVER_ARCHIVE_ENCRYPTION_FAILED:
    "We encountered issues while encrypting your files for archiving",
  SERVER_ARCHIVE_BUCKET_CLONING_FAILED:
    "We ran into issues while replicating your files for archiving",
  SERVER_ARCHIVE_DEAL_FAILED: "The storage deal wasn't successful",

  //Bucket remove
  SERVER_BUCKET_REMOVE_NO_CID:
    "We ran into issues while removing a file. There was no file specified",
  SERVER_BUCKET_REMOVE_BUCKET_NOT_FOUND: "We couldn't locate your files to delete",
  SERVER_BUCKET_REMOVE_NO_BUCKET_ITEMS: "We couldn't locate your files to delete",
  SERVER_BUCKET_REMOVE_NO_MATCHING_CID: "There were no matching files found",
  SERVER_BUCKET_REMOVE_FAILED: "We were not able to delete that file",

  //File create
  SERVER_CREATE_FILE_NO_FILE_PROVIDED:
    "We ran into issues while creating a file. No file was provided",
  SERVER_CREATE_FILE_DUPLICATE: "The uploaded file(s) were duplicates and were skipped",
  SERVER_CREATE_FILE_FAILED: "We ran into issues while creating that file",

  //File delete
  SERVER_REMOVE_DATA_NO_IDS: "The file to delete was not specified",

  //Save copy
  SERVER_SAVE_COPY_NO_CIDS: "The file to save was not specified",

  //Toggle file privacy
  SERVER_TOGGLE_FILE_PRIVACY_NO_FILE:
    "We ran into issues while editing a file's privacy. No file was specified",
  SERVER_TOGGLE_FILE_PRIVACY_UPDATE_FAILED:
    "We're having trouble updating the privacy of that file right now",

  //Update file
  SERVER_EDIT_DATA_NO_FILE: "We ran into issues while editing a file. No file was provided",
  SERVER_EDIT_DATA_FAILED: "We're having trouble updating that file right now",

  //Like file
  SERVER_LIKE_FILE_NO_FILE_PROVIDED:
    "We are having trouble finding that file right now. Please try again later",
  SERVER_LIKE_FILE_CHECK_ERROR:
    "We are having trouble determining whether you've already favorited that file yet. Please try again later",
  SERVER_UNLIKE_FILE_FAILED: "We are having trouble unfavoriting that file right now",
  SERVER_LIKE_FILE_FAILED: "We weren't able to favorite that file. Please try again later",

  //Delete api key
  SERVER_DELETE_API_KEY_NOT_FOUND:
    "We weren't able to locate that API key. It may have already been deleted",
  SERVER_DELETE_API_KEY_ERROR: "We weren't able to delete that API key. Please try again later",

  //Create api key
  SERVER_GENERATE_API_KEY_TOO_MANY_KEYS: "You've reached the limit for number of API keys",
  SERVER_GENERATE_API_KEY_ERROR:
    "We're having trouble generating an API key right now, please try again later",

  //Add to slate
  SERVER_ADD_TO_SLATE_NO_SLATE:
    "We ran into issues while adding files to that collection. No collection was specified",
  SERVER_ADD_TO_SLATE_SLATE_NOT_FOUND: "We're having trouble locating that collection right now",
  SERVER_ADD_TO_SLATE_NO_FILES:
    "We ran into issues while adding files to that collection. No files selected",
  SERVER_ADD_TO_SLATE_FAILED:
    "We're having trouble adding those files to that collection right now",

  //Slate create
  SERVER_CREATE_SLATE_EXISTING_SLATE_NAME:
    "You already have a collection with that name. Collection names must be unique",
  SERVER_CREATE_SLATE_FAILED:
    "We are having trouble creating that collection right now, please try again later",

  //Slate delete
  SERVER_DELETE_SLATE_SLATE_NOT_FOUND:
    "We're having difficulty locating that collection. It may have already been deleted",
  SERVER_DELETE_SLATE_FAILED:
    "We're having trouble deleting that collection right now, please try again later",

  //Get slate
  SERVER_GET_SERIALIZED_SLATE_SLATE_NOT_FOUND:
    "We were unable to locate that collection. It may be private or it may not exist",
  SERVER_GET_SERIALIZED_SLATE_PRIVATE_ACCESS_DENIED:
    "We were unable to locate that collection. It may be private or it may not exist",
  SERVER_GET_SLATE_NOT_FOUND:
    "We were unable to locate that collection. It may be private or it may not exist",
  SERVER_GET_SLATE_PRIVATE_ACCESS_DENIED:
    "We were unable to locate that collection. It may be private or it may not exist",

  //Remove from slate
  SERVER_REMOVE_FROM_SLATE_NO_ID_PROVIDED:
    "Unable to remove from collection because no collection was specified",
  SERVER_REMOVE_FROM_SLATE_SLATE_NOT_FOUND: "We are having trouble locating that collection",
  SERVER_REMOVE_FROM_SLATE_FAILED: "We are having trouble removing from that collection right now",

  //Update slate layout
  SERVER_UPDATE_SLATE_LAYOUT_MUST_PROVIDE_DATA: "No layout was provided to update",
  SERVER_UPDATE_SLATE_LAYOUT_NOT_FOUND: "We are having trouble locating that collection",
  SERVER_UPDATE_SLATE_LAYOUT:
    "We are unable to update that collection's layout right now. Please try again later",

  //Update slate
  SERVER_UPDATE_SLATE_MUST_PROVIDE_DATA:
    "We are unable to update that collection because no data was provided",
  SERVER_UPDATE_SLATE_NOT_FOUND: "We are having trouble locating that collection",
  SERVER_UPDATE_SLATE_UPDATE_PRIVACY_FAILED:
    "We are having trouble updating the privacy of that collection",
  SERVER_UPDATE_SLATE_INVALID_NAME: "Please use a valid collection name",
  SERVER_UPDATE_SLATE_NAME_TAKEN:
    "You already have a collection with that name. Collection names must be unique",
  SERVER_UPDATE_SLATE_FAILED: "We are having trouble updating that collection right now",

  //Create user
  SERVER_CREATE_USER_NOT_ALLOWED: "You can only create users while on slate.host",
  SERVER_CREATE_USER_ACCEPT_TERMS: "You must accept the terms of service to create an account",
  SERVER_CREATE_USER_USERNAME_TAKEN: "There is already an account with that username",
  SERVER_CREATE_USER_INVALID_USERNAME: "Please choose a valid username",
  SERVER_CREATE_USER_INVALID_PASSWORD: "Please choose a valid password",
  SERVER_CREATE_USER_INVALID_EMAIL: "Please choose a valid email",
  SERVER_CREATE_USER_BUCKET_INIT_FAILURE:
    "We're having trouble setting up your storage, please try again later",
  SERVER_CREATE_USER_FAILED:
    "We're having trouble creating your account right now. Please try again later",

  // Twitter
  SERVER_CREATE_USER_TWITTER_EXISTS: "There is already an account linked with your twitter",
  SERVER_TWITTER_OAUTH_NOT_ALLOWED: "You can only authenticate via twitter while on slate.host",
  SERVER_TWITTER_LOGIN_ONLY:
    "This login is associated with a Twitter account. Please continue with Twitter instead",
  SERVER_TWITTER_LINKING_INVALID_USERNAME: "Please choose a valid username/email",
  SERVER_TWITTER_LINKING_INVALID_PASSWORD: "Please choose a valid password",
  SERVER_TWITTER_LINKING_WRONG_CREDENTIALS: "You have entered an invalid username or password",
  SERVER_TWITTER_LINKING_FAILED: "SERVER_CREATE_USER_FAILED",
  // Email Verifications
  SERVER_EMAIL_VERIFICATION_INVALID_PIN: "Please enter a valid pin",
  SERVER_EMAIL_VERIFICATION_FAILED:
    "We're having trouble with verifying your email, please try again later",
  SERVER_CREATE_VERIFICATION_NOT_ALLOWED:
    "You can only send a verification pin while on slate.host",
  SERVER_CREATE_VERIFICATION_INVALID_EMAIL: "Please choose a valid email",
  SERVER_CREATE_VERIFICATION_EMAIL_TAKEN: "There is already an account with this email",
  SERVER_CREATE_VERIFICATION_FAILED:
    "We're having touble sending a verification pin right now, please try again later",
  SERVER_EMAIL_VERIFICATION_NOT_ALLOWED: "You can only verify an email while on slate.host",

  // Email Verification Legacy account
  SERVER_CREATE_VERIFICATION_INVALID_USERNAME: "Please choose a valid username",
  SERVER_CREATE_VERIFICATION_INVALID_PASSWORD: "Please choose a valid password",
  SERVER_CREATE_VERIFICATION_WRONG_PASSWORD:
    "We were unable to locate that account with those credentials",

  // Password Reset
  SERVER_RESET_PASSWORD_NOT_ALLOWED: "You can only reset your password while on slate.host",
  SERVER_CREATE_VERIFICATION_USER_NOT_FOUND: "We were not able to locate a user with this email",
  SERVER_RESET_PASSWORD_FAILED:
    "We're having touble resetting your password, please try again late",
  SERVER_RESET_PASSWORD_NO_PASSWORD: "Please choose a valid password",

  // Migrate User
  SERVER_MIGRATE_USER_NOT_ALLOWED: "You can only verify an email while on slate.host",
  SERVER_MIGRATE_USER_NO_TOKEN:
    "We're having touble sending a verification pin, please try again late",
  SERVER_MIGRATE_USER_INVALID_PIN: "Please enter a valid pin",

  //Get user
  SERVER_GET_USER_NO_USER_PROVIDED:
    "We were not able to fetch that user because no user was specified",
  SERVER_GET_USER_USER_NOT_FOUND: "We were not able to locate that user",

  //Get user social
  SERVER_USER_SOCIAL_NO_USER_ID:
    "We were not able to fetch that user's subscriptions and following because no user was specified",
  SERVER_USER_SOCIAL_SUBSCRIPTIONS_NOT_FOUND:
    "We were not able to locate that user's subscriptions",
  SERVER_USER_SOCIAL_FOLLOWING_NOT_FOUND: "We were not able to locate that user's following",
  SERVER_USER_SOCIAL_FOLLOWERS_NOT_FOUND: "We were not able to locate that user's followers",

  //Status update
  SERVER_STATUS_UPDATE_FAILED: "We're having trouble making that change right now",
  SERVER_STATUS_UPDATE_MUST_PROVIDE_UPDATE: "No update was provided",

  //Update user
  SERVER_USER_UPDATE_INVALID_USERNAME: "Please choose a valid username",
  SERVER_USER_UPDATE_USERNAME_IS_TAKEN: "There is already an account with that username",
  SERVER_USER_UPDATE_DEFAULT_ARCHIVE_CONFIG:
    "We're having trouble updating your settings right now",
  SERVER_USER_UPDATE_INVALID_PASSWORD: "Please choose a valid password",

  //Zip files
  GET_ZIP_FILES_PATHS_BUCKET_CHECK_FAILED: "We're having trouble locating those files right now",

  //Hydrate
  SERVER_VIEWER_DATA_ERROR:
    "We're having trouble fetching your information right now, please refresh the page",

  //Get deals
  SERVER_FILECOIN_NETWORK_DEALS_ERROR:
    "We're having trouble fetching your deal information right now",
  SERVER_FILECOIN_NETWORK_ERROR: "We're having trouble fetching your storage information right now",

  //Sign in
  SERVER_SIGN_IN_NOT_ALLOWED: "You can only sign in to an account while on slate.host",
  SERVER_SIGN_IN_NO_USERNAME: "Please provide a username to sign in",
  SERVER_SIGN_IN_NO_PASSWORD: "Please provide a password to sign in",
  SERVER_SIGN_IN_USER_NOT_FOUND: "We were unable to locate that account with those credentials",
  SERVER_SIGN_IN_WRONG_CREDENTIALS: "You have entered an invalid username or password",
  SIGN_IN_RATE_LIMITED:
    "You've tried to sign in too many times. Please wait 10 minutes before trying again",
  SIGN_UP_RATE_LIMITED:
    "You've sign up too many times in the past 10 minutes. Please wait 10 minutes before trying again",

  //Subscribe
  SERVER_SUBSCRIBE_MUST_PROVIDE_SLATE_OR_USER: "No collection or user to follow specified",
  SERVER_SUBSCRIBE_CAN_NOT_SUBSCRIBE_TO_YOURSELF: "You cannot follow yourself",
  SERVER_SUBSCRIBE_TARGET_USER_NOT_FOUND: "We are unable to locate that user",
  SERVER_SUBSCRIBE_TARGET_SLATE_NOT_FOUND: "We are unable to locate that collection",
  SERVER_SUBSCRIBE_SUBSCRIPTION_CHECK_ERROR:
    "We are having trouble editing that subscription right now",
  SERVER_UNSUBSCRIBE_FAILED: "We were unable to unsubscribe, please try again later",
  SERVER_SUBSCRIBE_FAILED: "We were unable to subscribe, please try again later",

  //Support
  SERVER_SUPPORT_NO_DATA_PROVIDED: "Please include details for us to send a support message",
  SERVER_SUPPORT_MUST_PROVIDE_EMAIL: "Please include an email where we can reach you",
  SERVER_SUPPORT_MUST_PROVIDE_MESSAGE: "Please include a support message",
  SERVER_SUPPORT_NO_USERNAME_PROVIDED: "Please include a username",
  UNITY_ZIP_DOWNLOAD_FAILED:
    "We're having trouble downloading your Unity game file. Please try again later",
};
