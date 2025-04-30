import "./YoutubeModal.scss"
import React from 'react'
import {Modal, ModalWindow, ModalHeader, ModalBody, ModalFooter} from "/src/components/modals/Modal.jsx"

function YoutubeModal({displayingYoutubeVideo, hideYoutubeVideo}) {
    let url = null;

    if (displayingYoutubeVideo) {
        url = displayingYoutubeVideo.url;
    }

    if (url && !url.includes('embed') && !url.endsWith('.mp4')) {
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get('v');
        url = `https://www.youtube.com/embed/${videoId}`;
    }

    const _close = () => {
        hideYoutubeVideo();
    }

    return (
        <Modal id={`youtube-modal`} visible={Boolean(displayingYoutubeVideo)}>
            {displayingYoutubeVideo && (
                <ModalWindow>
                    <ModalHeader
                        title={displayingYoutubeVideo.title}
                        faIcon={`fa-brands fa-youtube`}
                        onClose={_close}
                    />

                    <ModalBody>
                        <div className={`youtube-iframe-wrapper`}>
                            {url.endsWith('.mp4') ? (
                                <video
                                    src={url}
                                    controls
                                    style={{ width: '100%', borderRadius: '8px' }}
                                />
                            ) : (
                                <iframe
                                    src={url}
                                    className={`youtube-iframe`}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </ModalBody>

                    <ModalFooter text={displayingYoutubeVideo.description}/>
                </ModalWindow>
            )}
        </Modal>
    );
}

export default YoutubeModal;
