export default configs = {
    hostname: __ENV.HOSTNAME || "http://restapi.adequateshop.com",
    specs: ()=> {
        if(__ENV.SPECS == undefined || __ENV.SPECS == null) return;
        return __ENV.SPECS.split(",");
    },
    stages: ()=> {
        if(__ENV.STAGES == undefined || __ENV.STAGES == null) return;
        const stages = [];
        const _stages = __ENV.STAGES;
        if(_stages.includes(";")) {
            _stages.split(";").forEach((value,index) => {
                let _stage = value.split(",");
                const stage = {};
                stage.target = _stage[0].startsWith("vu") ? _stage[0].slice(1,_stage[0].length) : _throw('vu', index);
                stage.duration = _stage[1].startsWith("d") ? _stage[1].slice(1,_stage[1].length) : _throw('d', index);
                stages.push(stage);
            });
        }
    }
}

function _throw(p, index) {
    if(p == 'vu') {
        throw new Error(`missing target(vu) in stage ${index}`)
    }
    else if (p == 'd') {
        throw new Error(`missing duration(d) in stage ${index}`)
    }
};
//Set hostname from command line
//Set specs to be executed from command line
//Stages of vu and duration from command line > STAGES=vu20,d10s;vu40,d10s;v0,d10s
/**
 * get the number of stage group
 * create a corresponding stage with the stage group parameters
 */