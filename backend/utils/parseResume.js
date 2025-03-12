import ResumeParser from "resume-parser";

async function resumeParser(file) {
    ResumeParser.parseResumeFile(file, './files/compiled')
        .then(file => {
            console.log("Yay! " + file);
        })
        .catch(error => {
            console.error(error);
        });
}

export default resumeParser;
