(function( curl ) {

	var config = {
		baseUrl: 'js',
		pluginPath: null,
		paths: {
			domReady: 'curl/src/curl/plugin/domReady'
		},
        packages: [
            { name: 'curl', location: 'curl/src/curl', main: 'curl' },
            { name: 'wire', location: 'wire', main: 'wire' },
            { name: 'when', location: 'when', main: 'when' },
            { name: 'aop', location: 'aop', main: 'aop' }
        ]
	};

	curl(config, ['wire!knight-wired-spec']);

})( curl );