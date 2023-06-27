import Image1 from '../assests/abstract-dark-blue-luxury-background-free-vector.jpg';
import Image2 from '../assests/abstract-geometric-shape-gradient-background-free-vector.jpg';
import Image3 from '../assests/abstract-geometric-yellow-background-free-vector.jpg';
import Image4 from '../assests/abstract-green-geometric-background-free-vector.jpg';
import Image5 from '../assests/abstract-neon-background-free-vector.jpg';
import Image6 from '../assests/black-background-concept-free-vector.jpg';
import Image7 from '../assests/futuristic-abstract-geometric-background-free-vector.jpg';
import Image8 from '../assests/geometric-black-and-gold-background-free-vector.jpg';
import Image9 from '../assests/luxury-square-purple-background-with-glitters-free-vector.jpg';
import Image10 from '../assests/modern-gold-background-free-vector.jpg';
import Image11 from '../assests/realistic-abstracts-geometric-background-with-hexagonal-shape-free-vector.jpg';
import ClassroomLogo from '../assests/classroom.svg';
import WebHooksLogo from '../assests/webhooks.svg';
import CourseDogLogo from '../assests/logo.svg';
import SubscribeIcon from '../assests/add.svg';
import UnsubscribeIcon from '../assests/remove.svg';
import DeleteIcon from '../assests/delete.svg';
import DriveIdImage from '../assests/Untitled.png';
import PDFIcon from '../assests/pdf.svg';
import DownloadIcon from '../assests/download.svg';
import SearchIcon from '../assests/search.svg';
import HamburgerMenuIcon from '../assests/hamburger.svg';
import UserIcon from '../assests/user.svg';
import CloseIcon from '../assests/close.svg';

export const CourseImages = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
    Image11,
];

export const getRandomImage = () => {
    return CourseImages[Math.floor(Math.random() * 11)];
}

export const Classroom = ClassroomLogo;

export const WebHooks = WebHooksLogo;

export const CourseDog = CourseDogLogo;

export const Subscribe = SubscribeIcon;

export const Unsubscribe = UnsubscribeIcon;

export const Delete = DeleteIcon;

export const DriveId = DriveIdImage;

export const PDF = PDFIcon;

export const Download = DownloadIcon;

export const Search = SearchIcon;

export const User = UserIcon;

export const HamburgerMenu = HamburgerMenuIcon;

export const Close = CloseIcon;