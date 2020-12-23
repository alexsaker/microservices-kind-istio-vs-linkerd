import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './schemas/article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly catsService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.catsService.create(createArticleDto);
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.catsService.findAll();
  }
}
