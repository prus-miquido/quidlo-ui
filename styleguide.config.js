module.exports = {
    webpackConfig: require('./webpack.config.js'),
    components: () => [
        'src/InputCollection/InputCollectionContainer.jsx',
        'src/Input/InputContainer.jsx',
        'src/Switch/SwitchContainer.jsx',
        'src/Button/Button.jsx',
        'src/Icon/Icon.jsx',
        'src/Tag/Tag.jsx',
        'src/Avatar/Avatar.jsx'
    ],
    styles: {
        StyleGuide: {
            '@global html': {
                fontFamily: 'Soleil, sans-serif',
                fontSize: '62.5%'
            },
            '@global body': {
                fontSize: '1.2rem'
            },
        },
    },
    styleguideDir: 'docs/styleguide'
};