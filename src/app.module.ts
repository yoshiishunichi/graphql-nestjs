import { join } from "path";

import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./todo/todo.module";

@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      driver: ApolloDriver,
      sortSchema: true,
    }),
    TodoModule,
  ],
  providers: [AppService],
})
export class AppModule {}
