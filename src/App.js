import Frame from "./ui/components/Frame.js";
import Sidebar from "./ui/components/Sidebar.js";
import RawFileInputSection from "./ui/components/RawFileInputSection.js";

class App {
    
    constructor() {
        this.frame = new Frame();
        this.sidebar = new Sidebar();
        this.rawFileInputSection = new RawFileInputSection();
    }
};

export default App;