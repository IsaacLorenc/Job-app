# Job Search App Database Schema
```mermaid
erDiagram
    USERS ||--o{ SAVED_JOBS : saves
    JOBS ||--o{ SAVED_JOBS : "saved in"
    COMPANIES ||--o{ JOBS : posts
    INDUSTRIES ||--o{ COMPANIES : categorizes

    USERS {
        int user_id PK
        string username
        string email
        string password_hash
        string first_name
        string last_name
    }

    JOBS {
        int job_id PK
        int company_id FK
        string title
        text description
        string location
        date post_date
    }

    COMPANIES {
        int company_id PK
        int industry_id FK
        string name
        text description
        string website
    }

    INDUSTRIES {
        int industry_id PK
        string name
    }

    SAVED_JOBS {
        int saved_job_id PK
        int user_id FK
        int job_id FK
        date date_saved
    }
 ```