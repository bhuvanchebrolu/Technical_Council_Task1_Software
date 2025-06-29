let problems = [
  {
    species: "Dog",
    description: "Injured leg and limping near the park.",
    young: "No",
    image: "https://images.unsplash.com/photo-1601758064224-0b5da51b3c59",
    place: "Central Park"
  },
  {
    species: "Cat",
    description: "Trapped on a tree for hours, meowing loudly.",
    young: "Yes",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
    place: "Maple Street"
  },
  {
    species: "Cow",
    description: "Wound near the stomach, possibly hit by vehicle.",
    young: "No",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Cow_female_black_white.jpg",
    place: "NH Highway 24"
  },
  {
    species: "Monkey",
    description: "Got electric shock and collapsed on rooftop.",
    young: "No",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Monkey_in_Bali.jpg",
    place: "Hillview Apartments"
  },
  {
    species: "Dog",
    description: "Bleeding from ear, appears to be attacked.",
    young: "Yes",
    image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb",
    place: "Sector 12"
  },
  {
    species: "Cat",
    description: "Eye infection and limping around food stalls.",
    young: "No",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    place: "Clock Tower Market"
  },
  {
    species: "Buffalo",
    description: "Stuck in drainage canal, unable to move.",
    young: "No",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Water_buffalo_bathing_in_Bangladesh.jpg",
    place: "Kaveri Bridge"
  },
  {
    species: "Pigeon",
    description: "Wing broken, unable to fly.",
    young: "Yes",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Pigeon_on_rail.jpg",
    place: "Shanti Nagar"
  },
  {
    species: "Goat",
    description: "Severe leg injury near a construction site.",
    young: "No",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Goat_05293.jpg",
    place: "Sunshine Residency"
  },
  {
    species: "Dog",
    description: "Skin disease with visible hair loss.",
    young: "No",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
    place: "Old Bus Stand"
  },
  {
    species: "Cat",
    description: "Hit by car, bleeding near mouth.",
    young: "Yes",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f",
    place: "Mango Chowk"
  },
  {
    species: "Horse",
    description: "Collapsed due to exhaustion in heat.",
    young: "No",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Black_horse_grazing.jpg",
    place: "Racecourse Road"
  },
  {
    species: "Monkey",
    description: "Baby monkey separated from mother.",
    young: "Yes",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/72/Young_Rhesus_Macaque.jpg",
    place: "Rock Garden"
  },
  {
    species: "Dog",
    description: "Tied tightly, deep neck wound.",
    young: "No",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    place: "Indira Colony"
  },
  {
    species: "Cow",
    description: "Swallowed plastic, appears to be choking.",
    young: "No",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Holstein_Friesian_cow.jpg",
    place: "Krishna Nagar"
  }
];
const mongoose = require("mongoose");
const Problem = require("./models/problem");

mongoose.connect("mongodb://127.0.0.1:27017/animalWelfare")
  .then(async () => {
    console.log("DB connected. Seeding problems...");
    await Problem.deleteMany({});
    problems=problems.map((obj)=>({...obj,owner:'685d21936a7330dcda42a74b'}));
    await Problem.insertMany(problems);
    console.log("Seeding completed.");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
