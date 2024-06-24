import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiVelocityGraphComponent } from './ui-velocity-graph.component';

describe('UiVelocityGraphComponent', () => {
  let component: UiVelocityGraphComponent;
  let fixture: ComponentFixture<UiVelocityGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiVelocityGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiVelocityGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
