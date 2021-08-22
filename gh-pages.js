const ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/dhatcher/score-roller.git', // Update to point to your repository
        user: {
            name: 'Danny Hatcher', // update to use your name
            email: 'danny.r.hatcher@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
