const mongoose = require("mongoose");

const ConnectionRequestSchema =  new mongoose.Schema({
    fromUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    },
    status :{
        type: String,
        required: true,
        enum : {
            values :["ignore","interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`,
        },
    },
},
{
    timestamps:true
}
);

ConnectionRequestSchema.index({fromUserId:1 , toUserId: 1})

ConnectionRequestSchema.pre("save" , function (next)
{
    const connectionRequest = this;
    // Check if the FromUserId Is Same as ToUserId

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
        throw new Error("Cannot Send Connection Request to YourSelf ..!!!!");
    }
    next();
});

const ConnectionRequest = new mongoose.model('ConnectionRequest',ConnectionRequestSchema);
 module.exports = ConnectionRequest;