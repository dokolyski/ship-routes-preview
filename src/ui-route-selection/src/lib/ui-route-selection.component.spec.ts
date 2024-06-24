import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiRouteSelectionComponent } from './ui-route-selection.component';

describe('UiRouteSelectionComponent', () => {
  let component: UiRouteSelectionComponent;
  let fixture: ComponentFixture<UiRouteSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiRouteSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiRouteSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
