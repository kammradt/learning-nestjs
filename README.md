<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">Welcome to my learning proccess with NestJS ✏️ </p>
    <p align="center">
  <a href="https://twitter.com/kammzinho"><img src="https://img.shields.io/twitter/follow/kammzinho.svg?style=social&label=Follow"></a>
</p>

## Description 📝

> Hi there!
> I will update this repo with new information as soon as I build something cool 😅
> **Update**: Course finished! 🥰 Now I just need to find a problem to be solved 🤔


## Sections 🤹🏻‍♂️

- [X] Basic structure to perform CRUD ([this tag](https://github.com/kammradt/learning-nestjs/tree/crud-with-fake-data))   
- [X] Basic usage of pipes and validation on DTOs ([this tag](https://github.com/kammradt/learning-nestjs/tree/using-pipes-and-validation))   
- [X] Using persistence and queryBuilder([this tag](https://github.com/kammradt/learning-nestjs/tree/persistence-and-query-builder))
- [X] Adding basic Jwt Authentication ([this tag](https://github.com/kammradt/learning-nestjs/tree/adding-basic-auth))
- [X] Adding Authorization ([this tag](https://github.com/kammradt/learning-nestjs/tree/adding-authorization))
- [X] Adding Tests with Jest ([this tag](https://github.com/kammradt/learning-nestjs/tree/adding-tests))
- [X] Adding secure responses (@Exclude instead of DTOs) ([this tag](https://github.com/kammradt/learning-nestjs/tree/adding-global-dto-solution))
- [X] Adding role based authorization (ADMIN section)([this tag](https://github.com/kammradt/learning-nestjs/tree/adding-role-based-authorization))

## Useful links 🔗

- `class-validator` Annotations can be found [here](https://github.com/typestack/class-validator#validation-decorators)
- `TypeORM` [here](https://typeorm.io/)
- `queryBuilder` by `TypeORM` [here](https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md)
- `queryBuilder with find { }` [here](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md)
- Using a `ClassSerializerInterceptor` to hide sensitive data (instead of ResponseDTOs) [here](https://docs.nestjs.com/techniques/serialization#exclude-properties)
  - How to add it globally [here](https://stackoverflow.com/questions/55720448/nestjs-how-to-setup-classserializerinterceptor-as-global-interceptor)
- Using roles on handlers [here](https://docs.nestjs.com/guards#setting-roles-per-handler)
  - More details can be found [here](https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata).  
  I chose the `.getAndOverride` approach, where a `Controller` level has a default `Role`, and some `actions (methods)` inside it can have more specific/restricted roles.

## Stay in touch 🤗 👨🏻‍💻

- Author - [Vinicius Kammradt](https://kammradt.now.sh)
- Twitter - [@kammzinho](https://twitter.com/kammzinho)

