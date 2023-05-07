import { Injectable } from "@nestjs/common";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createBlogDto: CreateBlogDto) {
    return this.prisma.blog.create({
      data: {
        ...createBlogDto,
        userId,
      },
    });
  }

  async findAll(userId: number, skip: number) {
    const [blogs, total] = await this.prisma.$transaction([

      this.prisma.blog.findMany({
        skip: skip,
        take: 20,
        where: {
          userId,
        },
        select: {
          id: true,
          text: true,
          user: {
            select: {
              id: true,
              userName: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      }),
      
      this.prisma.blog.count({
        where: {
          userId,
        },
      }),
    ]);
    return { blogs, total };
  }

  findOne(id: number) {
    return this.prisma.blog.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.prisma.blog.update({
      where: {
        id,
      },
      data: updateBlogDto,
    });
  }

  remove(id: number) {
    return this.prisma.blog.delete({
      where: {
        id,
      },
    });
  }
}
