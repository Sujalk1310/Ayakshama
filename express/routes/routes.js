const { Router } = require('express');
const router = Router();
const NotificationUser = require("../models/NotificationUser");
const Recommendations = require("../models/Recommendations");
const HeartVital = require("../models/HeartVital");
const GastroVital = require("../models/GastroVital");
const GeneralVital = require("../models/GeneralVital");
const OrthoVital = require("../models/OrthoVital");
const Key = require("../models/Key");
const sendSms = require("./twilio");

router.get('/notifications', async (req, res) => {
    try {
        let noties = await NotificationUser.find();
        res.send(noties);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/recommendations', async (req, res) => {
    try {
        const { message } = req.body;
        sendSms("+918445433348", message);
        const newRec = new Recommendations({ message });
        await newRec.save();
        res.send("Successfully added recommendations");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/notifications', async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message);
        sendSms("+918445433348", message);
        const newNoti = new NotificationUser({ message });
        await newNoti.save();
        res.send("Successfully added notification");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/recommendations", async (req, res) => {
    try {
        let recs = await Recommendations.find();
        res.send(recs);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/key", async (req, res) => {
    try {
        let { key } = req.body;
        let keyInstance = await Key.findOne(); // Find a single document
        if (!keyInstance) {
            // If no key is found, create a new instance with ID 1310
            keyInstance = new Key({ _id: 1310, key });
        } else {
            // Update the existing key
            keyInstance.key = key;
        }
        await keyInstance.save(); // Save the updated document
        res.status(200).json({ message: "Key updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
})


router.get("/heart", async (req, res) => {
    try {
        let heart = await HeartVital.find();
        res.send(heart);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/ortho", async (req, res) => {
    try {
        let ortho = await OrthoVital.find();
        res.send(ortho);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/gastro", async (req, res) => {
    try {
        let gastro = await GastroVital.find();
        res.send(gastro);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/general", async (req, res) => {
    try {
        let general = await GeneralVital.find();
        res.send(general);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/heart', async (req, res) => {
    try {
        const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = req.body;
        const newVital = new HeartVital({ age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal });
        await newVital.save();
        res.send("Successfully added heart vital data!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/gastro', async (req, res) => {
    try {
        const { desc } = req.body;
        const newVital = new GastroVital({ desc });
        await newVital.save();
        res.send("Successfully added gastro vital data!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/ortho', async (req, res) => {
    try {
        const { desc, img } = req.body;
        const newVital = new OrthoVital({ desc, img });
        await newVital.save();
        res.send("Successfully added ortho vital data!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/general', async (req, res) => {
    try {
        const { desc } = req.body;
        const newVital = new GeneralVital({ desc });
        await newVital.save();
        res.send("Successfully added general vital data!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;