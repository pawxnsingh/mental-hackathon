import {Chatsidebar} from "@/components/sidebar";

export interface conversation{
    id:string;
    name:string;
    content:string;
    timeStamp:Date;
}

const Dashboard=()=>
   {
        const convo:conversation[]=[
            {id:"first",name:"Firespawn",content:"this is a previous therapy session",timeStamp:new Date()},
            {id:"second",name:"Firespawn",content:"this is an older therapy session",timeStamp:new Date()}
        ];
    return (
        <div className="container">
            <Chatsidebar conversations={convo}/>
        </div>
    )
}

export default Dashboard;