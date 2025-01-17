import { Dialog } from '@automattic/components';
import { useTranslate } from 'i18n-calypso';
import SuggestedFollowItem from 'calypso/blocks/reader-suggested-follows';
import { useRelatedSites } from 'calypso/data/reader/use-related-sites';
import { READER_SUGGESTED_FOLLOWS_DIALOG } from 'calypso/reader/follow-sources';

import './style.scss';

const ReaderSuggestedFollowsDialog = ( { onClose, siteId, postId, isVisible } ) => {
	const translate = useTranslate();
	const { data, isLoading } = useRelatedSites( siteId, postId );
	// If we are no longer loading and no data available, don't show the dialog
	if ( ! isLoading && ! data ) {
		return null;
	}
	return (
		<Dialog
			additionalClassNames="reader-recommended-follows-dialog"
			isBackdropVisible={ true }
			isVisible={ isVisible }
			onClose={ onClose }
			showCloseIcon={ true }
			label={ translate( 'Suggested follows' ) }
			shouldCloseOnEsc={ true }
		>
			<div className="reader-recommended-follows-dialog__content">
				<div className="reader-recommended-follows-dialog__header">
					<h2 className="reader-recommended-follows-dialog__title">
						{ translate( 'Suggested follows' ) }
					</h2>
					<p className="reader-recommended-follows-dialog__description">
						{ translate( "While you're at it, you might check out these sites." ) }
					</p>
				</div>
				<div className="reader-recommended-follows-dialog__body">
					<div className="reader-recommended-follows-dialog__follow-list">
						<ul className="reader-recommended-follows-dialog__follow-list">
							{ isLoading && (
								<li className="reader-recommended-follows-dialog__follow-item is-placeholder"></li>
							) }
							{ ! isLoading &&
								data &&
								data.map( ( relatedSite ) => (
									<li
										key={ relatedSite.global_ID }
										className="reader-recommended-follows-dialog__follow-item"
									>
										<SuggestedFollowItem
											site={ relatedSite }
											followSource={ READER_SUGGESTED_FOLLOWS_DIALOG }
										/>
									</li>
								) ) }
						</ul>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default ReaderSuggestedFollowsDialog;
