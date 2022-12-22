class IdeasController < ApplicationController
  before_action :authenticate_user!, only: :new

  def index
  end


  def new
    @idea = Idea.new
    @users = User.where.not(id: current_user.id)
  end

  def create
    binding.pry
    @idea = Idea.new(idea_params)
    if @idea.save
      redirect_to root_path
    else
      render :new
    end
  end

  private
  def idea_params
    params.require(:idea).permit(:title, :description, :user_id, :requestede_user_id, {images: []})
  end
end
