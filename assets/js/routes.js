import config from 'config'

/* ----------
all routes needs to be defined inline
see https://github.com/bigwheel-framework/documentation/blob/master/routes-defining.md#as-section-standard-form
---------- */
module.exports = {
	[`${config.BASE}`]: require('./sections/home'),
	[`${config.BASE}home`]: { section: require('./sections/home') },
	[`${config.BASE}furniture/:id`]: { section: require('./sections/furniture'), duplicate: true },
	[`${config.BASE}projects/:id`]: { section: require('./sections/projects'), duplicate: true },
	[`${config.BASE}projects`]: { section: require('./sections/projects')},


	[`${config.BASE}search`]: { section: require('./sections/search') },
	[`${config.BASE}glossary`]: { section: require('./sections/glossary') },
	[`${config.BASE}about`]: { section: require('./sections/about') },

	[`${config.BASE}contact`]: { section: require('./sections/contact') },

	[`${config.BASE}404`]: { section: require('./sections/404') },
	[`${config.BASE}subscribe`]: { section: require('./sections/subscribe') },

	[`${config.BASE}section/:id`]: { section: require('./sections/section'), duplicate: true },
    [`${config.BASE}gallery`]: { section: require('./sections/gallery'), duplicate: true, routes: {
            '/:id': { section: require('./sections/sub'), duplicate: true }
        }
    }
}