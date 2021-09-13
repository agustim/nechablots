const { Octokit } = require("@octokit/rest");

function Ghdb ( config ) {
    this.personalAccessToken = config.personalAccessToken;
    this.owner = config.owner
    this.repo = config.repo;
    this.path = config.path;
    this.branch = config.branch;
    this.octokit = null;

    this.toString = function(){
        return JSON.stringify(this)
    }
    this.getOptions = function(filename) {
        return ({
            owner: this.owner,
            repo: this.repo,
            ref: "refs/heads/" + this.branch,
            path: this.path + filename,
            branch: this.branch
        });
    }
    this.connectOctokit = function() {
        if (!this.octokit) {
            this.octokit = new Octokit({
                auth: "token " + this.personalAccessToken,
            });
        }
    }
    this.lowWriteGithub = async function (filename, reg) {
        const options = this.getOptions(filename)
        this.connectOctokit();
        var content = (reg) ? Buffer.from(reg).toString('base64') : "";
        var obj = Object.assign(options,{
            message: `update ` + filename,
            content: content,
        })

        var current = await this.lowReadGithub(filename)
        if (current != null) {
            obj.sha = current.sha
        }
        return this.octokit.repos.createOrUpdateFileContents(
            obj
        )
        .then((data) => {
            return data
        }, (error) => {
            console.log("ERROR:" + error)
            return error
        })
    }
    this.lowReadGithubCall = async function (f) {
        const options = this.getOptions(f)
        this.connectOctokit();
        let res = null
        try {
            res = await this.octokit.repos.getContent(options)
        } catch(e) {
            console.log(e)
            return null     
        }
        return res       
    }
    this.lowReadGithub = async function (filename) {
        var res = await this.lowReadGithubCall(filename)
        if (!res) return null
        var content = Buffer.from(res.data.content, 'base64').toString()
        if (!content) return { sha: res.data.sha }
        try {
            //content = JSON.parse(content)
            return { content: content , sha: res.data.sha }            
        } catch (e) {
            return null
        }
    }
    this.lowReadDirGithub = async function (dir) {
        var res = await this.lowReadGithubCall(dir)
        if (!res) return null
        const asyncRes = await Promise.all(res.data.map(async (e) => {
            const newPath = e.path.split('/')
            return {path: newPath[newPath.length - 1], type: e.type};
        }));
        return asyncRes
    }
    this.lowDeleteGithub = async function (filename) {
        const options = this.getOptions(filename)
        this.connectOctokit();
        var obj = Object.assign(options,{
            message: `deleteObject`,
        })

        var current = await this.lowReadGithub(filename)
        if (current != null) {
            obj.sha = current.sha
            return this.octokit.repos.deleteFile(
                obj
            )
            .then((data) => {
                return data
            }, (error) => {
                console.log("ERROR:" + error)
                return error
            })
        }
        return null
    }
}

export default Ghdb  