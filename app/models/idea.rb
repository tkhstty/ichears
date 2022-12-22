class Idea < ApplicationRecord
  with_options presence: true do
    validates :title, length: { maximum: 40, message: 'is invalid.'} 
    validates :description, length: { maximum: 1000, message: 'is invalid.' }
  end

  has_many :users
  has_many :idea_requested_users, dependent: :destroy
  has_many_attached :images
end
