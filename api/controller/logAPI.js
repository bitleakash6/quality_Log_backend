const logSchema = require("../model/logmodel");

exports.insertLog = async (req, res) => {
    try {
        const logArray = req.body;

        // Insert data into MongoDB
        const result = await logSchema.insertMany(logArray);

        // Create indexes on all specified fields
        const fieldsToIndex = ['level', 'log_string', 'timestamp', 'metadata.source'];

        fieldsToIndex.forEach((field) => {
            const indexSpec = {};
            indexSpec[field] = 1;

            logSchema.collection.createIndex(indexSpec, { background: true }, (err, indexes) => {
                if (err) {
                    console.error(`Error creating index for ${field}:`, err);
                } else {
                    console.log(`Index for ${field} created successfully`);
                }
            });
        });

        return res.status(200).json({ success: true, insertedCount: result.length });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.index = async (req, res) => {
    const { level, log_string, startDate, endDate, source } = req.body;

    try {
        // Check if all constants are empty
        if (!level && !log_string && !startDate && !endDate && !source) {
            return res.status(200).json([]);
        }

        // query based on non-empty constants
        const query = {};
        if (level) query.level = { $regex: level, $options: 'i' };
        if (log_string) query.log_string = { $regex: log_string, $options: 'i' };
        if (source) query["metadata.source"] = { $regex: source, $options: 'i' };
        if (startDate && endDate) {
            query.timestamp = { $gte: new Date(startDate), $lt: new Date(endDate) };
        }

        const result = await logSchema.find(query);
        const stats = await logSchema.find(query).explain("executionstats");
        console.log(stats);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error while fetching data" });
    }
};