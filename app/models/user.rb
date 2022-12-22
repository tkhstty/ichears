class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  validates :name, uniqueness: true, presence: true
  validates :password, format: { with: /\A(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{6,}\z/, message: 'is invalid(min 6 characters with alphabets and numbers'}

  has_many :ideas, through: :idea_requested_users
  has_many :idea_requested_users, dependent: :destroy
  has_one_attached :image
end
