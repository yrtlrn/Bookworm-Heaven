import HeroImage from "../../assets/Hero.jpg"
import SearchBar from "../SearchBar"

const Hero = () => {
  return (
    <div className="mt-2 relative">
        <img src={HeroImage} alt="Library (Hero) Image" height={1440} width={1920} className="object-contain z-0" />
        <SearchBar />
    </div>
  )
}
export default Hero