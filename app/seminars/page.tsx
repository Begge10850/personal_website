import { Footer, Header, Intro } from "../_components";
import { SeminarGallery } from "../_seminar-gallery";
const photos=[
  {src:"/seminars/itcs-stage.jpg",alt:"ITCS Berlin main stage"},
  {src:"/seminars/itcs-robot.jpg",alt:"Robotics demonstration at ITCS Berlin"},
  {src:"/seminars/itcs-talk.jpg",alt:"ITCS Berlin conference talk"},
  {src:"/seminars/itcs-treva.jpg",alt:"Treva Antony Ogwang at ITCS Berlin"},
];
export default function Seminars(){return <><Header active="Seminars"/><main className="container"><Intro pose="seminars" title="My Seminars" text="Workshops, talks, and events that broadened my technical and professional perspective."/><section className="page-content"><article className="seminar-card"><div className="seminar-copy"><div><p className="seminar-kicker">ITCS Berlin · Germany</p><h2>ITCS Berlin Career Fair Tech Conference</h2></div><span className="seminar-date">2024</span><p>I attended ITCS Berlin for the first time—an energetic mix of technology conferences, career opportunities, and interactive game zones. The event stood out for its seamless organization, dynamic atmosphere, sustainability focus, circular-economy ideas, free coffee and snacks, and lively after-party.</p><p>It was a valuable opportunity to explore emerging technology, meet people across the industry, and experience Berlin’s tech community in one place.</p></div><SeminarGallery photos={photos}/></article></section></main><Footer/></>}
