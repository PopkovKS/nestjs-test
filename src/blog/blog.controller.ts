import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
  HttpCode,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/auth/guards/access-token.guard";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";

@ApiTags("Blogs")
@Controller("blogs")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create blog" })
  @ApiResponse({ status: 201, description: 'Success', type: CreateBlogDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Request() req, @Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(req.user.id, createBlogDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOperation({ summary: "Getting all blogs" })
  @ApiResponse({ status: 200, type: CreateBlogDto })
  findAll(@Request() req, @Query("skip") skip: string) {
    return this.blogService.findAll(req.user.id, +skip);
  }

  @UseGuards(AccessTokenGuard)
  @Get(":id")
  @ApiOperation({ summary: "Gettings a blog with specified id" })
  @ApiResponse({ status: 200, type: CreateBlogDto })
  findOne(@Param("id") id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Updates a blog with specified id" })
  @ApiResponse({ status: 200, type: CreateBlogDto })
  update(@Param("id") id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Deletes a blog with specified id" })
  @ApiResponse({ status: 200, type: CreateBlogDto })
  remove(@Param("id") id: string) {
    return this.blogService.remove(+id);
  }
}
