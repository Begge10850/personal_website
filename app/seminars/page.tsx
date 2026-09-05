import { Footer, Header, Intro } from "../_components";
import { SeminarGallery } from "../_seminar-gallery";
const itcsPhotos=[
  {src:"/seminars/itcs-stage.jpg",alt:"ITCS Berlin main stage"},
  {src:"/seminars/itcs-robot.jpg",alt:"Robotics demonstration at ITCS Berlin"},
  {src:"/seminars/itcs-talk.jpg",alt:"ITCS Berlin conference talk"},
  {src:"/seminars/itcs-treva.jpg",alt:"Treva Antony Ogwang at ITCS Berlin"},
];
const aiCupPhotos=[
  {src:"/seminars/gisma-ai-cup-team.png",alt:"Treva and fellow students working during the GISMA AI Cup"},
  {src:"/seminars/gisma-ai-cup-gomoku.png",alt:"A Gomoku AI match projected during the tournament"},
  {src:"/seminars/gisma-ai-cup-classroom.png",alt:"Students taking part in the GISMA AI Cup"},
];
export default function Seminars(){return <><Header active="Seminars"/><main className="container"><Intro pose="seminars" title="My Seminars" text="Workshops, talks, and events that broadened my technical and professional perspective."/><section className="page-content stack"><article className="seminar-card"><div className="seminar-copy"><div><p className="seminar-kicker">GISMA University · Potsdam</p><h2>GISMA AI Cup: Gomoku Tournament</h2></div><span className="seminar-date">2024</span><p>During Skills Sprint Week, I took part in the AI Cup, where student teams built programs to play Gomoku and tested them in a live tournament. It gave me practical experience of developing an idea with a teammate, testing it under pressure, and learning from the different approaches used by other teams.</p></div><SeminarGallery photos={aiCupPhotos}/></article><article className="seminar-card"><div className="seminar-copy"><div><p className="seminar-kicker">ITCS Berlin · Germany</p><h2>ITCS Berlin Career Fair Tech Conference</h2></div><span className="seminar-date">2024</span><p>I attended ITCS Berlin to explore new technology, hear directly from people working across the industry, and learn more about Berlin’s tech community. The mix of talks, company stands, demonstrations, and conversations made it a useful and enjoyable first visit.</p></div><SeminarGallery photos={itcsPhotos}/></article></section></main><Footer/></>}
