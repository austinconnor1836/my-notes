# Generators vs. Lists

## Generator

```python
def square_numbers(nums):
    for i in nums:
        yield (i*i)
        
my_nums = square_numbers([1,2,3,4,5])

for num in my_nums:
    print(num)
```

### Another way

```python
my_nums = (x*x for x in [1,2,3,4,5])

print list(my_nums)
```

## Performance

- for large datasets, generators do not hold data in memory
- generators have much better performance for large datasets