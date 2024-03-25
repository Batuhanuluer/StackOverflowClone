import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({required:true})
    email : string ;    

    @Prop({reguired  : true})
    name : string ;

    @Prop({reguired  : true})
    lastname : string ;

    @Prop({reguired  : true})
    password : string ;

    @Prop({reguired  : false})
    followlist : [string] ;

    @Prop({ default: false })
    isEmailVerified: boolean; // Yeni eklenen alan: E-posta adresinin doğrulanıp doğrulanmadığını belirtir
}

export const UserSchema = SchemaFactory.createForClass(User)