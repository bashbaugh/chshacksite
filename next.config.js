const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({ 
  pageExtensions: ['ts', 'tsx', 'mdx'],
  async redirects() {
    return [
      {
        source: '/qr/:slug',
        destination: '/?fromQr=:slug',
        permanent: false,
      },
      {
        source: '/incoming',
        destination: 'https://airtable.com/shrmhTlkdQAAXxLsw',
        permanent: false,
      },
    ]
  },
  env: {
    QR_HUNT_CODES: process.env.QR_HUNT_CODES
  }
})
