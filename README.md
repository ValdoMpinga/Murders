# Murder

Murders is a continuation work of <a href="https://github.com/ValdoMpinga/MurdersRPC">Murders RPC</a>  

> Status: Developed

# Work Context

The present work had as objective to develop the abilities of the students in the
integration of different services by writing APIs, importing data and integrating between
databases and other services.

# Work rules

+ For the development of the proposed works, the language of
Javascript programming with the Node.js framework.
+ The implementation details that are due to the interpretation of the statements by the
groups of students should be described in the slides with detail and justification of the options taken.
+ The implementation of extra functionalities not present in the statement will be valued, provided that
these features do not modify the mandatory requirements and do not reduce the difficulty of the
job. The extra functionalities implemented must be documented in the slides to be
deliver with work.
+ Submission of non-original reports and/or implementations that constitute plagiarism,
lead to the immediate attribution of a zero grade in the group work and to eventual processes
disciplinary.

# Work fullfiled goals description

 - [x]   Each group should use the same dataset used in Practical Assignment 1 ( <a href="https://github.com/ValdoMpinga/MurdersRPC">Murders RPC</a> ) and reuse the
structure already defined in the previous work.
 - [x]   At least 3 entities present in the TP1 dataset must be selected, and
at least 2 of these entities must have a membership relationship, that is, one of the entities
must have a 1-N or N-N relationship with the 2nd entity. Examples: Team / Player (one
Team has several players, one player is in only one team); Film / Actor (each actor
can participate in multiple Films and each Film has multiple actors).
The. If the dataset does not allow individualizing 3 entities, the group should discuss with the
teachers looking for alternatives.
 - [x]  A structure must be defined in a NoSQL database (MongoDB - www.mongodb.com)
where these entities will be represented. The database must have the necessary collections
to represent the defined entities.
 - [x] In addition to the system entities, a collection must be created that represents the
system users. Users only have e-mail and password. the passwords
of users will be saved in this database with SHA512 encryption.
 - [x] Users will have 3 levels of permissions:
    i. View – can only view entity data
    ii. Edit – can view and edit system entity data
    iii. Admin – has Edit permissions and can CRUD users
 - [x]  Models should be implemented using Object Modeling technologies.
It is recommended to use Mongoose [https://mongoosejs.com/].
 - [x] The unique identifiers of the entities must use keys in GUID
[https://www.npmjs.com/package/guid] instead of numeric keys. If the entities
originally already had Ids of any type, these must be converted to the
new format.
 - [x] An API must be created that allows performing CRUD of all entities and users.
Endpoints must also be created that allow relating entities.
a. The naming of API endpoints must follow REST standards. Must be
using the most appropriate HTTP states and verbs for the answers and questions to the
API. Examples:
   i. get a movie
   GET {HOSTNAME}/api/movies/cc29b080-be7c-4e7f-b80c-76d47aee400c
   ii. Get the actors for a movie.
   GET {HOSTNAME}/api/movies/a8248e6f-7f58-4734-9768-e4fd287ef97f/actors
   iii. Add an actor to a movie
   POST {HOSTNAME}/api/movies/a8248e6f-7f58-4734-9768-e4fd287ef97f/actors
   iv. Update an actor from a movie
   PUT {HOSTNAME}/api/movies/a8248e6f-7f58-4734-9768-e4fd287ef97f/actors/
   8bb06980-53ff-4c13-b3fb-4887b3a4e935
b. PUT operations must be idempotent.
c. API authentication must use JSONWEBTOKEN
[https://www.npmjs.com/package/jsonwebtoken].
d. All operations must be validated through the models and respect the
integrity and relationship restrictions (eg it should not be possible to delete an Actor that
is already included in a movie).
 - [x]  In the API, endpoints must be created that allow the migration of data from the previous dataset
to MongoDB
a. The Node.js service must connect directly to the PostgreSQL database
defined earlier and get the data needed to send to MongoDB
b. An Endpoint must be created to start the migration work. once started
a migration, this Endpoint will be unavailable until the migration is complete.
    i. Migration should insert all data from all undeleted files
c. Data migration must be idempotent, that is, it will only import entities that
have not been recorded before.
 - [x] Deverão ser realizados testes simples a todos os endpoints. Poderá ser utilizado o Postman ou
uma abordagem via código com Mocha [https://mochajs.org/].
