module Rails3JQueryAutocomplete

  # Inspired on DHH's autocomplete plugin
  # 
  # Usage:
  # 
  # class ProductsController < Admin::BaseController
  #   autocomplete :brand_and_products_search, { :brand => [:name, :description], :product => [:name, :description]  }
  # end
  #
  # This will magically generate an action autocomplete_brand_and_products_search, so, 
  # don't forget to add it on your routes file
  # 
  #   resources :products do
  #      get :autocomplete_brand_and_products_search, :on => :collection
  #   end
  #
  # On your view, include the attribute autocomplete on the text field using the url to the autocomplete action as the value.
  # 
  #   f.autocomplete_field :brand_and_products_name, autocomplete_brand_and_products_search_products_path
  #
  module ClassMethods
    def autocomplete(name, targets, options = {})
      define_method("autocomplete_#{name}") do
        term = params[:term]
        items = []
        if term && !term.empty?
          targets.each do |object, methods|
            items += ( get_autocomplete_items(:model => get_object( object ), :options => options, :term => term, :methods => methods ) )
          end
        else
          items = []
        end
        render :json => json_for_autocomplete(items.uniq, options[:display_value] ||= :autocomplete_display)
      end
    end
    
#    def autocomplete(name, targets, options = {})
#      define_method("autocomplete_#{name}") do
#        term = params[:term]
#        items = []
#        if term && !term.empty?
#          targets.each do |object, methods|
#            methods.each do |method|
#              items += ( get_autocomplete_items(:model => get_object( object ), :options => options, :term => term, :method => method ) )
#            end
#          end
#        else
#          items = []
#        end
#        render :json => json_for_autocomplete(items.uniq, options[:display_value] ||= :autocomplete_display)
#      end
#    end
        
  end

end

