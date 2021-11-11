import { RemoteCapabilities } from '@wdio/types/build/Capabilities';

export enum AmwWDIOEnvs {
	localChrome = 'localChrome',
	localFirefox = 'localFirefox',
	localSafari = 'localSafari',
	localEdge = 'localEdge',
	ciChrome = 'ciChrome',
	ciFirefox = 'ciFirefox',
}

export type AmwWDIOEnv = AmwWDIOEnvs | string;
export type CapabilitiesConfig = {
	[key in AmwWDIOEnvs]: RemoteCapabilities;
}

const WDIO_CAPABILITIES_CONFIG_MAP: CapabilitiesConfig = {
	/*
		Local:
	 */
	localChrome: [{
		browserName: 'chrome',
		acceptInsecureCerts: true,
		'goog:chromeOptions': {
			args: [
				'-incognito',
			],
			// enable network emulation for mobile:
			// mobileEmulation: {
			//   networkThrottle: '3G'
			// }
		},
		maxInstances: 5,
	}],
	localFirefox: [{
		browserName: 'firefox',
		acceptInsecureCerts: true,
		'moz:firefoxOptions': {
			// args: [ '-headless' ],
		},
		excludeDriverLogs: [
			'bugreport',
			'server',
		],
	}],
	localSafari: [{
		browserName: 'safari',
		maxInstances: 1,
		// specs: [
		//   'test/safariOnly/*',
		// ],
		// port: 5555,
	}],
	localEdge: [{
		browserName: 'MicrosoftEdge',
		maxInstances: 1,
		// specs: [
		//   'test/edgeOnly/*',
		// ],
		// port: 5555,
	}],

	/*
		CI:
	 */
	ciChrome: [{
		browserName: 'chrome',
		acceptInsecureCerts: true,
		maxInstances: 5,
		// HEADLESS CHROME:
		'goog:chromeOptions': {
			args: [
				'-headless',
				'-incognito',
				'-no-sandbox',
				'-window-size=2880,1800',
			],
		},
	}],
	ciFirefox: [{
		browserName: 'firefox',
		acceptInsecureCerts: true,
		'moz:firefoxOptions': {
			args: [
				// '-private',
				'-headless',
			],
		},
		excludeDriverLogs: [
			'bugreport',
			'server',
		],
	}],
};

export const WDIO_TESTING_ENV: AmwWDIOEnv = process.env.CAPABILITY ?? AmwWDIOEnvs.localChrome;
export const WDIO_CAPABILITY_CONFIG: RemoteCapabilities = WDIO_CAPABILITIES_CONFIG_MAP[ WDIO_TESTING_ENV as AmwWDIOEnvs ];
