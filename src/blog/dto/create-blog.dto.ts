import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBlogDto {
  
  @ApiProperty({ description: ' the name of the blog ', example: 'Hello Word!' })
  @IsString()
  text: string;

}
