

# function that returns proper divisors of #


# class (or just list? dict?) that keeps track of who has what nums

class Game:
    def __init__(self, size):
        self.size = size
        
        self.available = list(range(2, self.size)) # what if put in 1 or 2
    
    def return_available(self):

        return self.available
    
    def player_pick(self, num):
        if (num not in self.available):
            print("That number is not available!")
            return 0
        
    





# main function that interacts with user 

print("Welcome to Taxman! How many numbers do you want to start with? ")

