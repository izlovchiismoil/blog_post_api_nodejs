import fs from "fs";

export async function getInitialData (req, res) {
    try {
        await fs.readFile("initial.json", "utf-8", (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: "Error reading file"
                });
            }
            return res.status(200).send(data);
        });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}