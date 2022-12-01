# README

# テーブル設計

## users テーブル
| Column              | Type    | Option                    |
| ------------------- | ------- | ------------------------- |
| name                | string  | null:false, unique: true  |
| email               | string  | null:false, unique: true  |
| encrypted_password  | string  | null:false                |

### Association
- has_many :ideas
- has_many :works
- has_many :tips
- has_many :idea_comments
- has_many :work_comments
- has_many :favorite_users, foreign_key: "favorite_user_id"
- has_many :followed_users, class_name: "FavoriteUser", foreign_key: "followed_user_id"
- has_many :favorite_ideas
- has_many :favorite_works
- has_many :user_rooms
- has_many :rooms, through: :user_rooms
- has_many :messages

## ideas テーブル
| Column       | Type        | Option                             |
| ------------ | ----------- | ---------------------------------- |
| title        | string      | null:false                         |
| description  | text        | null:false                         |
| to_user      | references  | foreign_key: { to_table: :users }  |
| user         | references  | null:false, foreign_key: true      |

### Association
- belongs_to :user
- has_many :works
- has_many :tips
- has_many :idea_comments
- has_many :favorite_ideas
- has_many :idea_tags
- has_many :tags, through: :idea_tags

## works テーブル
| Column       | Type        | Option                         |
| ------------ | ----------- | ------------------------------ |
| title        | string      | null:false                     |
| description  | text        | null:false                     |
| idea         | references  | foreign_key: true              |
| user         | references  | null:false, foreign_key: true  |

### Association
- belongs_to :user
- belongs_to :idea
- has_many :work_comments
- has_many :favorite_works
- has_many :work_tags
- has_many :tags, through: :work_tags

## tips テーブル
| Column       | Type        | Option                          |
| ------------ | ----------- | ------------------------------- |
| idea_tip_id  | integer     |                                 |
| work_tip_id  | integer     |                                 |
| idea         | references  | foreign_key: true               |
| work         | references  | foreign_key: true               |
| user         | references  | null: false, foreign_key: true  |

### Association
- belongs_to :user
- belongs_to :idea
- belongs_to :idea_tip
- belongs_to :work_tip

## idea_comments テーブル
| Column       | Type        | Option                          |
| ------------ | ----------- | ------------------------------- |
| comment      | string      |                                 |
| idea         | references  | null: false, foreign_key: true  |
| user         | references  | null: false, foreign_key: true  |

### Association
- belongs_to :user
- belongs_to :idea

## work_comments テーブル
| Column       | Type        | Option                          |
| ------------ | ----------- | ------------------------------- |
| comment      | string      | null: false                     |
| work         | references  | null: false, foreign_key: true  |
| user         | references  | null: false, foreign_key: true  |

### Association
- belongs_to :user
- belongs_to :work

## tags テーブル
| Column       | Type        | Option                          |
| ------------ | ----------- | ------------------------------- |
| tag_name     | string      | null: false                     |

### Association
- has_many :idea_tags
- has_many :ideas, through: :idea_tags
- has_many :work_tags
- has_many :works, through: :work_tags

## favorite_users テーブル
| Column         | Type        | Option                                          |
| -------------- | ----------- | ----------------------------------------------- |
| favorite_user  | references  | null: false, foreign_key: { to_table: :users }  |
| followed_user  | references  | null: false, foreign_key: { to_table: :users }  |

### Association
- belongs_to :favorite_user, class_name: "User"
- belongs_to :followed_user, class_name: "User"

## favorite_ideas テーブル
| Column  | Type        | Option                          |
| ------  | ----------- | ------------------------------- |
| idea    | references  | null: false, foreign_key: true  |
| user    | references  | null: false, foreign_key: true  |

### Association
- belongs_to :idea
- belongs_to :user

## favorite_works テーブル
| Column  | Type        | Option                          |
| ------  | ----------- | ------------------------------- |
| work    | references  | null: false, foreign_key: true  |
| user    | references  | null: false, foreign_key: true  |

### Association
- belongs_to :work
- belongs_to :user

## rooms テーブル
| Column  | Type        | Option                          |
| ------  | ----------- | ------------------------------- |
| user    | references  | null: false, foreign_key: true  |

### Association
- has_many :user_rooms
- has_many :user, through: :user_rooms
- has_many :messages

## messages テーブル
| Column  | Type        | Option                          |
| ------  | ----------- | ------------------------------- |
| room    | references  | null: false, foreign_key: true  |
| user    | references  | null: false, foreign_key: true  |

### Association
- belongs_to: user
- belongs_to: room