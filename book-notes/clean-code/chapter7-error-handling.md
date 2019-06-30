## Chapter 7: Error Handling

### Special Case Objects

If there are no meal expenses, it returns a `MealExpense` object that returns the *per diem* as its total:

```java
public class PerDiemMealExpenses implements MealExpenses {
    public int getTotal() {
        // return the per diem default
    }
}
```

### Don't Return Null

Bad code example:

```java
public void registerItem(Item item) {
    if (item != null) {
        ItemRegistry registry = persistentStore.getItemRegistry();
        if (registry != null) {
            Item existing = registry.getItem(item.getID());
            if (existing.getBillingPeriod().hasRetailOwner()) {
                existing.register(item);
            }
        }
    }
}
```

If a case is not addressed, a `NullPointerException` will be returned at runtime.

Consider the following code:

```java
List<Employee> employees = getEmployees();
if (employees != null) {
    for(Employee e : employees) {
        totalPay += e.getPay();
    }
}
```

Fortunately, Java has `Collections.emptyList()` and it returns a predefined immutable list that we can use for this purpose:

```java
public List<Employee> getEmployees() {
    if( .. there are no employees .. ) {
        return Collections.emptyList();
    }
}
```

This will minimize the chance of `NullPointerExceptions` and your code will be cleaner.

### Don't Pass Null

Avoid passing `null` into methods whenever possible, unless if an API requires you to do so.

