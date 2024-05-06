/** @type import("@react-native-community/cli-types").Config */
module.exports = {
  dependency: {
    project: {
      // iOS specific properties go here
      ios: {
        automaticPodsInstallation: true
      },
      // Android specific properties go here
      android: {},
    },
  },
};
