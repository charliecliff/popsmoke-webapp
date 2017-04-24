var config = {}

config.dynamoDB = {
    table: 'popsmoke-sessions',
    AWSConfigJSON: {
        accessKeyId: "AKIAIDMIESKUD4F657BQ",
        secretAccessKey: "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",
        region: "us-east-1"
    },

    // Optional clean up interval, defaults to 600000 (10 minutes)
    reapInterval: 86400000,    // 1 day

    // Optional ProvisionedThroughput params, defaults to 5
    readCapacityUnits: 25,
    writeCapacityUnits: 25
};