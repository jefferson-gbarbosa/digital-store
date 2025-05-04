import Gallery from "./components/Gallery"
import Header from "./components/Header"
import Section from "./components/Section"

const images = [
  { src: '../../public/home-slide-1.jpeg' },
  { src: '../../public/home-slide-2.jpeg' },
  { src: '../../public/home-slide-3.jpeg' },
  { src: '../../public/home-slide-4.jpeg' }
]

function App() {
  return (
    <div>
        <Header/>
        <Section>
          <Gallery images={images} interval={5000}/>
        </Section>
    </div>
  )
}

export default App
