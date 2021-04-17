const movieDB = {

    products : [
        {
            id:123,
            title:'Alita: Battle Angel',
            price:4.99,
            buy : 7.99,
            description:"A deactivated cyborg's revived, but can't remember anything of her past and goes on a quest to find out who she is.",
            featured: true,
            imgPath : "AlitaPoster.jpg",
            imgBig: "Alita.png"
        },

        {
            id:124,
            title:'The Avengers',
            price:4.99,
            buy : 7.99,
            description:"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
            featured: true,
            imgPath : "AvengersPoster.jpg",
            imgBig: "Avengers.png"

        },
        {
            id:125,
            title:'Ready Player One',
            price:4.99,
            buy : 7.99,
            description:"When the creator of a virtual reality called the OASIS dies, he makes a posthumous challenge to all OASIS users to find his Easter Egg, which will give the finder his fortune and control of his world.",
            featured:true,
            imgPath : "rposter.jpg",
            imgBig: "r.jpg"

        },
        {
            id:126,
            title:'Furious 7',
            price:4.99,
            buy : 7.99,
            description:"After the intense battle in London, Dominique Torreto (Vin Diesel) and his friends returned to a peaceful life, but the grievances of the rivers and lakes never allowed them to leave easily. . The tricky enemy Owen Shaw is paralyzed in the hospital, unable to move, while his older brother Dyke Shaw (Jason Stantham) vowed to avenge his younger brother.",
            featured:true,
            imgPath : "sposter.jpg",
            imgBig : "s.jpg"

        },
        {
            id:127,
            title:'Bumblebee',
            price:4.99,
            buy : 7.99,
            description:"The Decepticons, who intend to conquer everything, attack, Cybertron is about to fall, and B-127 (voiced by Dylan O'Brien) is desperately ordered to go to Earth. In California in 1987, B-127 was not only hunted down by Agent Burns (played by John Cena), but also severely injured by Lightning (voiced by David Sobolov), language module and memory The module is severely damaged.",
            featured: false,
            imgPath : "beePoster.png",
            imgBig : "bee.jpg"

        },
        {
            id:128,
            title:'Guardians of the Galaxy Vol. 2',
            price:4.99,
            buy : 7.99,
            description:"The Rocket Raccoon (Bradley Cooper) stole the high priest Ayesha (Elizabeth Debicki)’s energy battery, including the Star Lord (Chris Pratt), Carmora (Zoe Saldana) and Drax (Dave Bautista) were attacked by a fleet sent by the latter.",
            featured: false,
            imgPath : "galaxyPoster.jpg",
            imgBig : "galaxy.jpg"
        }
    ],

    tvShows : [
        {
            id:221,
            title:'The Gifted Season 1',
            price:19.99,
            buy : 23.99,
            description:"The play tells a couple who discover that their children have superpowers and their peaceful lives are instantly disintegrated. And they had to take risks and avoid the authorities.",
            featured: true,
            imgPath : "TheGiftedPoster.jpg",
            imgBig : "TheGifted.jpg",
            tv : true
        },

        {
            id:222,
            title:"The Mandalorian Season 1",
            price:19.99,
            buy : 23.99,
            description:"Following Jango and Boba Fett, another legend of the Mandalorian warrior is about to unfold slowly. At that time the empire fell, the legion was not up, and far beyond the territory of the New Republic, a lone gunman wandered across the stars.",
            featured: true,
            imgPath : "TheMandalorianPoster.jpg",
            imgBig : "TheMandalorian.jpg",
            tv : true

        },
        {
            id:223,
            title:'Agents of S.H.I.E.L.D. Season 1',
            price:19.99,
            buy : 23.99,
            description:"The Avengers and the subsequent far-reaching battle of New York made aliens and superpowers no longer the secrets of legends. After the Battle of New York, the world is about to be reshuffled, careerists are ready to move, and SHIELD faces unprecedented challenges.",
            featured: true,
            imgPath : "S.H.I.E.L.DPoster.jpg",
            imgBig : "S.H.I.E.L.D.jpg",
            tv : true

        },
        {
            id:224,
            title:'Game of Thrones Season 8',
            price:19.9,
            buy : 23.99,
            description:"Jon Snow (Kit Harington), who returns to Winterfell, learns from Bran Stark (Isaac Hempstead-Wright) The secrets of his life experience made his relationship with Daenerys Targaryen (Emilia Clarke) cast a frost.",
            featured: true,
            imgPath : "TvgamePoster.png",
            imgBig: "Tvgame.jpg",
            tv : true
            
        },
        {
            id:225,
            title:'The Flash',
            price:19.99,
            buy : 23.99,
            description:"After being struck by lightning, Barry Allen wakes up from his coma to discover he's been given the power of super speed, becoming the next Flash, fighting crime in Central City.",
            featured: false,
            imgPath : "TheFlashPoster.jpg",
            imgBig: "TheFalsh.jpg",
            tv : true

        },
        {
            id:226,
            title:'Stranger Things',
            price:19.9,
            buy : 23.99,
            description:"When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
            featured: false,
            imgPath : "strangerPoster.png",
            imgBig : "stranger.jpg",
            tv : true

        }
    ],

    getAllProducts()
    {
        
        return this.products;
    },

    getAllTvShow(){
        return this.tvShows;
    },

    getAProduct(id)
    {
        var all = this.products.concat(this.tvShows);
       


      const productReturned=  all.find((product)=>{

            return product.id == id;
        })

        

        return productReturned;
    },

    getAllFeaturedProducts()
    {
         
        let productFeature = [];
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].featured === true){
               productFeature.push(this.products[i]);
            }
        }
        return productFeature;
    },

    getAllFeaturedTv(){
        let tvFeature = [];
        for(let i = 0; i < this.tvShows.length; i++){
            if(this.tvShows[i].featured === true){
                tvFeature.push(this.tvShows[i]);
            }
        }
        return tvFeature;
    },


}

module.exports=movieDB;