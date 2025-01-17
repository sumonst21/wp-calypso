/**
 * @group gutenberg
 */

import { DataHelper, TestAccount, FullSiteEditorPage } from '@automattic/calypso-e2e';
import { Browser, Page } from 'playwright';

declare const browser: Browser;

describe( DataHelper.createSuiteTitle( 'Site Editor: Limited Global Styles' ), function () {
	let page: Page;
	let fullSiteEditorPage: FullSiteEditorPage;
	let testAccount: TestAccount;

	beforeAll( async () => {
		page = await browser.newPage();

		testAccount = new TestAccount( 'simpleSiteFreePlanUser' );
		await testAccount.authenticate( page );

		fullSiteEditorPage = new FullSiteEditorPage( page );
	} );

	it( 'Visit the site editor', async function () {
		await fullSiteEditorPage.visit( testAccount.getSiteURL( { protocol: true } ) );
		await fullSiteEditorPage.prepareForInteraction( { leaveWithoutSaving: true } );

		await fullSiteEditorPage.ensureNavigationTopLevel();
	} );

	it( 'Open site styles', async function () {
		await fullSiteEditorPage.clickFullSiteNavigatorButton( 'Styles' );
	} );

	it( 'Select the "Try it out" option in the upgrade modal', async function () {
		await fullSiteEditorPage.tryGlobalStyles();
	} );

	it( 'Pick a non-default style variation and check that the save notice shows up', async function () {
		// The primary site of the `simpleSiteFreePlanUser` account has the Twenty Twenty-Two
		// theme which includes a "Blue" style variation. If the active theme on the site
		// ever changes, we'll need to update the name of this style variation.
		await fullSiteEditorPage.setStyleVariation( 'Blue' );
	} );

	it( 'Reset styles to defaults and check that the save notice does not show up', async function () {
		await fullSiteEditorPage.setStyleVariation( 'Default' );
	} );
} );
