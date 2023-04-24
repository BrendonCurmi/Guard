module.exports = api => {
    // const isTest = api.env("test");
    api.cache(true);
    return {
        presets: [
            "@babel/preset-react",
            [
                "@babel/preset-env",
                {
                    targets: {
                        node: true
                    }
                }
            ]
        ],
        plugins: ["@babel/plugin-proposal-class-properties"]
    }
};
