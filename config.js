module.exports = {
    port: 4000,
    sitename: 'FADD Pay',
    siteurl: 'http://localhost:4000', // without the ending slash
    database: {
        mongodb: 'mongodb://localhost:27017/faddpay'
    },
    currencies: ['EUR', 'USD', 'HUF']
}