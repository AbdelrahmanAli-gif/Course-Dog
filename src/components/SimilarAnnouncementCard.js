import '../styles/SimilarAnnouncementCard.css'

function SimilarAnnouncemetCard(props) {
    return (
        <div className="similar-announcement-container">
            <p className="similar-announcement">{props.similarAnnouncement}</p>
        </div>
    )

}

export default SimilarAnnouncemetCard;