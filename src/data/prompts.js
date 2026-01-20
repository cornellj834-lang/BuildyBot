export const prompts = {
    parker: [ // Age 2 (Simple, low coins 2-5)
        { id: 'p-tower', text: "Build a tall tower!", coins: 3, category: 'building' },
        { id: 'p-doghouse', text: "Build a house for a dog.", coins: 5, category: 'building' },
        { id: 'p-bridge', text: "Build a long bridge.", coins: 4, category: 'building' },
        { id: 'p-redcar', text: "Build a red car.", coins: 4, category: 'vehicle' },
        { id: 'p-pizza', text: "Build a yummy pizza.", coins: 2, category: 'generic' },
        { id: 'p-square', text: "Build a big square.", coins: 2, category: 'generic' },
        { id: 'p-train', text: "Build a fast train.", coins: 5, category: 'vehicle' },
        { id: 'p-robot', text: "Build a robot friend.", coins: 5, category: 'generic' },
        { id: 'p-bface', text: "Build a silly face.", coins: 3, category: 'generic' },
        { id: 'p-rainbow', text: "Build a rainbow wall.", coins: 4, category: 'generic' },
        { id: 'p-flower', text: "Build a pretty flower.", coins: 3, category: 'generic' },
        { id: 'p-boat', text: "Build a boat for the bath.", coins: 4, category: 'vehicle' },
        { id: 'p-plane', text: "Build a plane with wings.", coins: 5, category: 'vehicle' },
        { id: 'p-tree', text: "Build a green tree.", coins: 3, category: 'generic' },
        { id: 'p-gate', text: "Build a gate for a farm.", coins: 4, category: 'building' }
    ],
    barrett: [
        // ===== VEHICLES (8-20 coins) =====
        { id: 'b-racecar', text: "Build a race car that could win the Grand Prix.", coins: 10, category: 'vehicle' },
        { id: 'b-monster-truck', text: "Build a monster truck with giant wheels.", coins: 12, category: 'vehicle' },
        { id: 'b-amphib', text: "Build a vehicle that works on land AND water.", coins: 15, category: 'vehicle' },
        { id: 'b-jetpack', text: "Build a person wearing a jetpack.", coins: 10, category: 'vehicle' },
        { id: 'b-helicopter', text: "Build a rescue helicopter with a winch.", coins: 15, category: 'vehicle' },
        { id: 'b-tank', text: "Build a futuristic tank with laser cannons.", coins: 18, category: 'vehicle' },
        { id: 'b-hovercraft', text: "Build a hovercraft that floats on air.", coins: 15, category: 'vehicle' },
        { id: 'b-firetruck', text: "Build a fire truck with an extending ladder.", coins: 18, category: 'vehicle' },
        { id: 'b-excavator', text: "Build a construction excavator with a moving arm.", coins: 20, category: 'vehicle' },

        // ===== SPACE (12-30 coins) =====
        { id: 'b-mars', text: "Build a spaceship that can land on Mars.", coins: 18, category: 'space' },
        { id: 'b-time', text: "Build a time machine with controls.", coins: 20, category: 'space' },
        { id: 'b-satellite', text: "Build a satellite with solar panels.", coins: 12, category: 'space' },
        { id: 'b-moon-base', text: "Build a moon base with a landing pad.", coins: 25, category: 'space' },
        { id: 'b-alien-ship', text: "Build a UFO for friendly aliens.", coins: 15, category: 'space' },
        { id: 'b-space-station', text: "Build a space station with multiple rooms.", coins: 30, category: 'space' },
        { id: 'b-rover', text: "Build a Mars rover with a robot arm.", coins: 18, category: 'space' },
        { id: 'b-rocket', text: "Build a rocket with detachable stages.", coins: 22, category: 'space' },

        // ===== BUILDINGS & ARCHITECTURE (15-35 coins) =====
        { id: 'b-volcano', text: "Build a secret base hidden inside a volcano.", coins: 25, category: 'building' },
        { id: 'b-treehouse', text: "Build the ultimate treehouse with a rope bridge.", coins: 20, category: 'building' },
        { id: 'b-city', text: "Build a futuristic city with flying cars.", coins: 30, category: 'building' },
        { id: 'b-pyr', text: "Build an ancient pyramid with a hidden trap.", coins: 20, category: 'building' },
        { id: 'b-hero-hq', text: "Build a superhero headquarters.", coins: 22, category: 'building' },
        { id: 'b-skyscraper', text: "Build a skyscraper with at least 5 floors.", coins: 25, category: 'building' },
        { id: 'b-lighthouse', text: "Build a working lighthouse on a rocky shore.", coins: 18, category: 'building' },
        { id: 'b-bank', text: "Build a bank with a vault.", coins: 20, category: 'building' },
        { id: 'b-stadium', text: "Build a sports stadium with seats.", coins: 30, category: 'building' },
        { id: 'b-bridge-big', text: "Build a suspension bridge cars can cross.", coins: 22, category: 'building' },
        { id: 'b-airport', text: "Build an airport with a control tower.", coins: 35, category: 'building' },
        { id: 'b-hospital', text: "Build a hospital with an ambulance bay.", coins: 25, category: 'building' },

        // ===== FANTASY & MEDIEVAL (15-35 coins) =====
        { id: 'b-castle', text: "Build a castle with a working drawbridge.", coins: 30, category: 'fantasy' },
        { id: 'b-dragon', text: "Build a dragon that guards treasure.", coins: 25, category: 'fantasy' },
        { id: 'b-wizard-tower', text: "Build a wizard's tower with a spiral staircase.", coins: 22, category: 'fantasy' },
        { id: 'b-pirate-ship', text: "Build a pirate ship with cannons.", coins: 25, category: 'fantasy' },
        { id: 'b-knight', text: "Build a knight in full armor on a horse.", coins: 18, category: 'fantasy' },
        { id: 'b-treasure-chest', text: "Build a treasure chest that opens.", coins: 12, category: 'fantasy' },
        { id: 'b-catapult', text: "Build a catapult that can launch bricks.", coins: 18, category: 'fantasy' },
        { id: 'b-dungeon', text: "Build a dungeon with a secret escape.", coins: 20, category: 'fantasy' },
        { id: 'b-throne', text: "Build a throne room fit for a king.", coins: 20, category: 'fantasy' },

        // ===== ANIMALS & NATURE (10-25 coins) =====
        { id: 'b-dino', text: "Build a dinosaur skeleton in a museum.", coins: 20, category: 'animal' },
        { id: 'b-zoo', text: "Build a zoo with at least 3 animal enclosures.", coins: 25, category: 'animal' },
        { id: 'b-aquarium', text: "Build an aquarium with fish and sharks.", coins: 22, category: 'animal' },
        { id: 'b-safari', text: "Build a safari jeep and wild animals.", coins: 18, category: 'animal' },
        { id: 'b-farm', text: "Build a working farm with a barn.", coins: 20, category: 'animal' },
        { id: 'b-jungle', text: "Build a jungle scene with vines and animals.", coins: 22, category: 'animal' },
        { id: 'b-pet-shop', text: "Build a pet shop with different animals.", coins: 15, category: 'animal' },
        { id: 'b-insect', text: "Build a giant insect (ant, bee, or spider).", coins: 12, category: 'animal' },

        // ===== ROBOTS & MECHS (12-30 coins) =====
        { id: 'b-mech', text: "Build a giant robot mech a person can pilot.", coins: 28, category: 'generic' },
        { id: 'b-cookbot', text: "Build a robot designed to cook dinner.", coins: 12, category: 'generic' },
        { id: 'b-helper-bot', text: "Build a robot that helps with homework.", coins: 12, category: 'generic' },
        { id: 'b-battle-bot', text: "Build a battle robot with weapons.", coins: 18, category: 'generic' },
        { id: 'b-transform', text: "Build something that transforms into something else.", coins: 25, category: 'generic' },

        // ===== SCENES & STORIES (15-35 coins) =====
        { id: 'b-movie', text: "Build a scene from your favorite movie.", coins: 20, category: 'generic' },
        { id: 'b-game', text: "Build a scene from your favorite video game.", coins: 20, category: 'generic' },
        { id: 'b-bedroom', text: "Build your dream bedroom.", coins: 15, category: 'building' },
        { id: 'b-restaurant', text: "Build a restaurant with a kitchen.", coins: 22, category: 'building' },
        { id: 'b-amusement', text: "Build an amusement park ride.", coins: 25, category: 'building' },
        { id: 'b-escape', text: "Build an escape room with puzzles.", coins: 30, category: 'building' },
        { id: 'b-concert', text: "Build a concert stage with instruments.", coins: 22, category: 'generic' },
        { id: 'b-sports', text: "Build your favorite sport being played.", coins: 18, category: 'generic' },

        // ===== EPIC CHALLENGES (30-50 coins) =====
        { id: 'b-world', text: "Build your own world with multiple buildings.", coins: 40, category: 'building' },
        { id: 'b-battle', text: "Build an epic battle scene with two sides.", coins: 35, category: 'fantasy' },
        { id: 'b-invention', text: "Invent something that doesn't exist yet.", coins: 30, category: 'generic' },
        { id: 'b-story', text: "Build a 3-part story that tells an adventure.", coins: 45, category: 'generic' },
        { id: 'b-combo', text: "Combine two different sets into one creation.", coins: 35, category: 'generic' },
        { id: 'b-challenge', text: "Build the tallest tower that can stand by itself.", coins: 25, category: 'building' },
        { id: 'b-symmetry', text: "Build something perfectly symmetrical.", coins: 20, category: 'generic' },
        { id: 'b-moving', text: "Build something with a part that moves.", coins: 30, category: 'generic' },
        { id: 'b-mini', text: "Build a tiny version of something huge.", coins: 18, category: 'generic' },
        { id: 'b-mega', text: "Build the biggest thing you've ever made.", coins: 50, category: 'generic' }
    ]
};
