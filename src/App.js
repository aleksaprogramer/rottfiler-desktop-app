import Frame from "./ui/components/Frame.js";
import Sidebar from "./ui/components/Sidebar.js";
import RawFileInputSection from "./ui/components/RawFileInputSection.js";
import FolderInputSection from "./ui/components/FolderInputSection.js";
import RecoveredFilesData from "./ui/components/RecoveredFilesData.js";
import RawFileData from "./ui/components/RawFileData.js";
import BackButton from "./ui/components/BackButton.js";

class App {
    
    constructor() {
        this.frame = new Frame();
        this.sidebar = new Sidebar();
        this.rawFileInputSection = new RawFileInputSection();
        this.rawFileData = new RawFileData();
        this.folderInputSection = new FolderInputSection();
        this.recoveredFilesData = new RecoveredFilesData();
        this.backButton = new BackButton();
    }
};

export default App;